package com.txmq.swirldsframework.messaging;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.net.Socket;

import com.swirlds.platform.Platform;
import com.txmq.socketdemo.SocketDemoState;
import com.txmq.socketdemo.SwirldsTransactionType;

import io.swagger.model.Zoo;

public class TransactionServerConnection extends Thread {

	private Socket socket;
	private Platform platform;
	
	public TransactionServerConnection(Socket socket, Platform platform) {
		this.socket = socket;
		this.platform = platform;
	}
	
	public void run() {
		try {
			ObjectOutputStream writer = new ObjectOutputStream(this.socket.getOutputStream());
			ObjectInputStream reader = new ObjectInputStream(socket.getInputStream());
			SwirldsMessage message;
			SwirldsMessage response = new SwirldsMessage();
			try {
				Object tmp = reader.readObject();
				message = (SwirldsMessage) tmp; 
				SocketDemoState state = (SocketDemoState) this.platform.getState();
				
				switch(message.transactionType) {
					case ACKNOWLEDGE:
						//We shouldn't receive this from the client.  If we do, just send it back
						response.transactionType = SwirldsTransactionType.ACKNOWLEDGE;
						break;
					case GET_ZOO:
						//This is a read transaction, so no need to call Platform.createTransaction().
						//We can read what we need out of state and return it.
						Zoo zoo = new Zoo();
						zoo.setLions(state.getLions());
						zoo.setTigers(state.getTigers());
						zoo.setBears(state.getBears());
						
						response.transactionType = SwirldsTransactionType.ACKNOWLEDGE;
						response.payload = zoo;
						break;
					default:
						//ADD_ANIMAL requires us to submit a transaction to the hashgraph.
						ByteArrayOutputStream bytesOut = new ByteArrayOutputStream();
						ObjectOutput out = new ObjectOutputStream(bytesOut);
						out.writeObject(message);
						out.flush();
						this.platform.createTransaction(bytesOut.toByteArray(), null);
						
						response.transactionType = SwirldsTransactionType.ACKNOWLEDGE;
				}
				
				writer.writeObject(response);					
				writer.flush();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("Closing Socket");
			this.socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
