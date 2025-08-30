package com.yhcanbay.sohbet_uygulamasi.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.yhcanbay.sohbet_uygulamasi.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtUserDetails implements UserDetails{

    public Long id;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority > authorities;

    public static JwtUserDetails create(User user){
        List<GrantedAuthority> authoritiesList = new ArrayList<>();
        authoritiesList.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new JwtUserDetails(user.getId(),user.getUserName(),user.getPassword(),authoritiesList);
    }
}
