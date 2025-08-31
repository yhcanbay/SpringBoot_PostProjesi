package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoUserRequest;
import com.yhcanbay.sohbet_uygulamasi.security.JwtTokenProvider;
import com.yhcanbay.sohbet_uygulamasi.service.impl.UserServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthControllerImpl {

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider JwtTokenProvider;

    private UserServiceImpl userService;

    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public String login(@RequestBody DtoUserRequest loginRequest){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(),loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = JwtTokenProvider.generateJwtToken(auth);
        return "Bearer " + jwtToken;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody DtoUserRequest registerRequest){
        if(userService.findByUsername(registerRequest.getUserName()) != null){
            return new ResponseEntity<>("Username already in use.",HttpStatus.BAD_REQUEST);
        }

        DtoUser user = new DtoUser();
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.createUser(user);
        return new ResponseEntity<>("User sucsessfully registered", HttpStatus.CREATED);
    }
}
