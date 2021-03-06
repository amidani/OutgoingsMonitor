package org.amidani.labs.om.server.controller;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/**
 * 
 * @author Abdelkader Midani
 *
 */

@Controller
@RequestMapping("/auth")
public class AuthenticationController {
	
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@RequestMapping(method=RequestMethod.GET, value="/check")
	public void login(HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Write JSON in the output stream of the servlet");
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();

        if (user != null) {
        	log.info("USER : "+user.getEmail());
        	new ObjectMapper().writeValue(response.getOutputStream(), user.getEmail());
        }else{
        	log.warning("non authentifié");
        	String url = userService.createLoginURL("/index.html");
        	response.setStatus(HttpStatus.UNAUTHORIZED.value());
        	new ObjectMapper().writeValue(response.getOutputStream(), new String[] {url});        	
        }
	}
	@RequestMapping(method=RequestMethod.GET, value="/logout")
	public void logout(HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		UserService userService = UserServiceFactory.getUserService();
        String url = userService.createLogoutURL("/index.html");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), new String[] {url});        	
	}

}
