package com.yhcanbay.sohbet_uygulamasi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Like;

@Repository
public interface ILikeRepository extends JpaRepository<Like,Long> {

}
