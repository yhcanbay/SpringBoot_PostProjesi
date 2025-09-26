package com.yhcanbay.sohbet_uygulamasi.service;

import com.yhcanbay.sohbet_uygulamasi.entities.RefreshToken;
import com.yhcanbay.sohbet_uygulamasi.entities.User;

public interface ITokenService {

    boolean isRefreshExpired(RefreshToken token);

    String createRefreshToken(User user);

    RefreshToken getByUserId(Long userId);

}
