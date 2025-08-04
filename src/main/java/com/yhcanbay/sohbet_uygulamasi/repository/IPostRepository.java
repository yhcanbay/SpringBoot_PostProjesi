package com.yhcanbay.sohbet_uygulamasi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Post;

@Repository
public interface IPostRepository extends JpaRepository<Post,Long> {
    List<Post> findByUserId(Long userId);
}
