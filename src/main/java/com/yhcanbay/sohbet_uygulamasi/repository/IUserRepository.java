package com.yhcanbay.sohbet_uygulamasi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.User;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    public User findByUserName(String userName);
}
