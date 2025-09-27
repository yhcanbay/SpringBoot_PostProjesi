package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.entities.RefreshToken;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.repository.ITokenRepository;
import com.yhcanbay.sohbet_uygulamasi.service.ITokenService;

@Service
public class TokenServiceImpl implements ITokenService {

    @Value("${Refresh_Token.expires.in}")
    private Long expireSeconds;

    @Autowired
    ITokenRepository tokenRepository;

    @Override
    public boolean isRefreshExpired(RefreshToken token){
        return token.getExpireDate().isBefore(LocalDate.now());
    }

    @Override
    public String createRefreshToken(User user){

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpireDate(LocalDate.now().plusDays(7));
        tokenRepository.save(token);

        return token.getToken();
    }

    @Override
    public RefreshToken getByUserId(Long userId) {
        Optional<RefreshToken> optional = tokenRepository.getByUserId(userId);

        if(optional.isPresent()){
            return optional.get();
        }

        return null;
    }

}
