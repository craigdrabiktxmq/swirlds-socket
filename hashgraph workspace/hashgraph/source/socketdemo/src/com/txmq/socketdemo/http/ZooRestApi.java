package com.txmq.socketdemo.http;

import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.txmq.socketdemo.SocketDemoState;
import com.txmq.socketdemo.SwirldsTransactionType;
import com.txmq.swirldsframework.core.PlatformLocator;
import com.txmq.swirldsframework.messaging.SwirldsMessage;

import io.swagger.model.Animal;
import io.swagger.model.Zoo;
@Path("/HashgraphZoo/1.0.0")
public class ZooRestApi {
	@GET
	@Path("/zoo")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getZoo() {
		SocketDemoState state = (SocketDemoState) PlatformLocator.getState();
		Zoo result = new Zoo();
		result.lions(state.getLions());
		result.tigers(state.getTigers());
		result.bears(state.getBears());
		
		return Response.ok().entity(result).build();
	}
	
	@POST
	@Path("/zoo/animals")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addAnimal(Animal animal) {
		SwirldsMessage message = new SwirldsMessage(SwirldsTransactionType.ADD_ANIMAL, animal);
		
		try {
			PlatformLocator.getPlatform().createTransaction(message.serialize(), null);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.status(201).entity(animal).build();
	}
}
