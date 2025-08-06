package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoPost;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.repository.IPostRepository;
import com.yhcanbay.sohbet_uygulamasi.repository.IUserRepository;
import com.yhcanbay.sohbet_uygulamasi.service.IPostService;

@Service
public class PostServiceImpl implements IPostService{

    @Autowired
    IPostRepository postRepository;

    @Autowired
    IUserRepository userRepository;

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
    public DtoPost createOnePost(DtoPost newPost) {

        Post post = new Post();
        BeanUtils.copyProperties(newPost, post);
        
        Optional<User> optional = userRepository.findById(newPost.getUserId());
        if(optional.isPresent()){
            post.setUser(optional.get());
        } else {
            // Handle the case where the user does not exist
            throw new RuntimeException("User not found with ID: " + newPost.getUserId());
        }

        post = postRepository.save(post);

        return newPost;
    }
}
