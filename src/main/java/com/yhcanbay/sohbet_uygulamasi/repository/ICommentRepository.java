package com.yhcanbay.sohbet_uygulamasi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment,Long>{

    List<Comment> findByUserIdAndPostId(@Param("userId") Long userId, @Param("postId") Long postId);

    List<Comment> findByUserId(@Param("userId") Long userId);

    List<Comment> findByPostId(@Param("postId") Long postId);
    
}
