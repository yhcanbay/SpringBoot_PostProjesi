package com.yhcanbay.sohbet_uygulamasi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yhcanbay.sohbet_uygulamasi.entities.RefreshToken;

public interface ITokenRepository extends JpaRepository<RefreshToken,Long>{

    Optional<RefreshToken> getByUserId(Long id);

}
