package com.yhcanbay.sohbet_uygulamasi.security;

import org.springframework.security.core.Authentication;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtTokenProvider {

    @Value("${SpringBoot_PostProjesi.app.secret}")
    private String APP_SECRET;

    @Value("${SpringBoot_PostProjesi.app.in}")
    private Long EXPIRES_IN;

    public String generateJwtToken(Authentication auth){
        JwtUserDetails userDetails = (JwtUserDetails) auth.getPrincipal();
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);
        Key key = Keys.hmacShaKeyFor(APP_SECRET.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
            .setSubject(Long.toString(userDetails.getId()))
            .setIssuedAt(new Date()).setExpiration(expireDate)
            .signWith(key,SignatureAlgorithm.HS256).compact();
    }

    public Long getUserIdFromJwt(String token){
        Key key = Keys.hmacShaKeyFor(APP_SECRET.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token){
        try {
            Key key = Keys.hmacShaKeyFor(APP_SECRET.getBytes(StandardCharsets.UTF_8));

            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);

            return !isTokenExpired(token);
        } catch (SignatureException e) {
            return false;
        } catch (MalformedJwtException e){
            return false;
        } catch (ExpiredJwtException e){
            return false;
        } catch (UnsupportedJwtException e){
            return false;
        } catch (IllegalArgumentException e){
            return false;   
        }
    }

    private boolean isTokenExpired(String token) {
        Key key = Keys.hmacShaKeyFor(APP_SECRET.getBytes(StandardCharsets.UTF_8));

        Date expiration = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration();
        return expiration.before(new Date());
    }
}
