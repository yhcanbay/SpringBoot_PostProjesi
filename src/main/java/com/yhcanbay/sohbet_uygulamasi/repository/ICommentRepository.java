package com.yhcanbay.sohbet_uygulamasi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yhcanbay.sohbet_uygulamasi.entities.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment,Long>{

}
