package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.entities.Post;
import com.yhcanbay.sohbet_uygulamasi.repository.IPostRepository;
import com.yhcanbay.sohbet_uygulamasi.service.IPostService;

@Service
public class PostServiceImpl implements IPostService{

    @Autowired
    IPostRepository postRepository;

    @Override
    public List<Post> getAllPosts(Optional<Long> userId) {
        if(userId.isPresent()){
            return postRepository.findByUserId(userId.get());
        }   
        return postRepository.findAll(); 
    }

    @Override
    public Post getOnePostById(Long postId) {
        return postRepository.findById(postId).get();
    }

    @Override
    public Post createOnePost(Post newPost) {
        return postRepository.save(newPost);
    }
}
