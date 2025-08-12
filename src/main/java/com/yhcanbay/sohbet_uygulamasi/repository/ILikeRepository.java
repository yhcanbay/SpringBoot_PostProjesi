package com.yhcanbay.sohbet_uygulamasi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Like;

@Repository
public interface ILikeRepository extends JpaRepository<Like,Long> {

    List<Like> findByUserIdAndPostId(@Param("userId") Long userId, @Param("postId") Long postId);

    List<Like> findByUserId(@Param("userId") Long userId);

    List<Like> findByPostId(@Param("postId") Long postId);
}
