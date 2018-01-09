package io.swagger.api.impl;

import io.swagger.api.*;
import io.swagger.model.*;

import io.swagger.model.Animal;

import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import com.txmq.socketdemo.SwirldsTransactionType;
import com.txmq.swirldsframework.messaging.SwirldsAdaptor;
import com.txmq.swirldsframework.messaging.SwirldsMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2018-01-08T17:35:13.100Z")
public class ZooApiServiceImpl extends ZooApiService {
	@Override
	public Response addAnimal(Animal animal, SecurityContext securityContext) throws NotFoundException {
		if (animal.getSpecies().equals("lion") || animal.getSpecies().equals("tiger")
				|| animal.getSpecies().equals("bear")) {

			SwirldsAdaptor adaptor = new SwirldsAdaptor();
			adaptor.sendTransaction(SwirldsTransactionType.ADD_ANIMAL, animal);
			return Response.ok().entity(animal).build();
		} else {
			return Response.serverError().build();
		}
	}

	@Override
	public Response getZoo(SecurityContext securityContext) throws NotFoundException {
		SwirldsAdaptor adaptor = new SwirldsAdaptor();
		SwirldsMessage response = adaptor.sendTransaction(SwirldsTransactionType.GET_ZOO, null);
		System.out.println(response.payload);
		return Response.ok().entity(response.payload).build();
	}
}
