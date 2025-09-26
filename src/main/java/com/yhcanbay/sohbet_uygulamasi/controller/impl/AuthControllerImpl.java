package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.yhcanbay.sohbet_uygulamasi.dto.DtoAuth;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoRefreshRequest;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoUser;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoUserRequest;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.security.JwtTokenProvider;
import com.yhcanbay.sohbet_uygulamasi.service.ITokenService;
import com.yhcanbay.sohbet_uygulamasi.service.impl.UserServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthControllerImpl {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider JwtTokenProvider;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ITokenService tokenService;
    
    @PostMapping("/login")
    public DtoAuth login(@RequestBody DtoUserRequest loginRequest){
        
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(),loginRequest.getPassword()); 
        Authentication auth = authenticationManager.authenticate(authToken); 
        // ↑ ↑ ↑ userDetailsService ve PasswordEncoder kullanarak bilgilerin doğruluğunu test eder. Yanlışlık durumunda burda hata verilir.
        // - Bu auth nesnesi artık:
        // - principal → kullanıcı bilgileri (UserDetails)
        // - authorities → roller/izinler
        // - authenticated = true
        // içeriyor.
        
        SecurityContextHolder.getContext().setAuthentication(auth);
        // ↑ ↑ ↑ bu tanımlama ile başka bir classda SecurityContextHolder.getContext().getAuthentication() ile kullanıcıya ulaşılabilir
        
        String jwtToken = JwtTokenProvider.generateJwtToken(auth);
        User user = userService.findByUsername(loginRequest.getUserName());
        DtoAuth dtoAuth = new DtoAuth();

        dtoAuth.setId(user.getId());
        dtoAuth.setAccsessToken("Bearer" + jwtToken);
        dtoAuth.setRefreshToken(tokenService.createRefreshToken(user));

        return dtoAuth;
    }

    @PostMapping("/register")
    public ResponseEntity<DtoAuth> register(@RequestBody DtoUserRequest registerRequest){
        
        if(userService.findByUsername(registerRequest.getUserName()) != null){
            DtoAuth dtoAuth = new DtoAuth();
            dtoAuth.setMassage("Username already in use.");
            return new ResponseEntity<>(dtoAuth,HttpStatus.BAD_REQUEST);
        }

        DtoUser user = new DtoUser();
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.createUser(user);
        
        DtoAuth dtoAuth = new DtoAuth();
        dtoAuth.setMassage("User sucsessfully registered");
        
        return new ResponseEntity<>(dtoAuth, HttpStatus.CREATED);
    }

    @PostMapping("/refresh")
    public ResponseEntity<DtoAuth> refresh(@RequestBody DtoRefreshRequest refreshRequest){

        tokenService.getByUserId(refreshRequest.getUserId());
        
        return null;
    }
}
