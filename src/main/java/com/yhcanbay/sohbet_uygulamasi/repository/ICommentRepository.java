package com.yhcanbay.sohbet_uygulamasi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment,Long>{

    // @Query("SELECT c FROM Comment c JOIN FETCH c.user JOIN FETCH c.post WHERE c.user.id = :userId AND c.post.id = :postId")
    List<Comment> findByUserIdAndPostId(@Param("userId") Long userId, @Param("postId") Long postId);

    // @Query("SELECT c FROM Comment c JOIN FETCH c.user JOIN FETCH c.post WHERE c.user.id = :userId")
    List<Comment> findByUserId(@Param("userId") Long userId);

    // @Query("SELECT c FROM Comment c JOIN FETCH c.user JOIN FETCH c.post WHERE c.post.id = :postId")
    List<Comment> findByPostId(@Param("postId") Long postId);
    
}
