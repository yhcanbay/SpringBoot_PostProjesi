package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    @Override
    public List<DtoPost> getAllPosts(Optional<Long> userId) {
        
        if(userId.isPresent()){
            Optional<User> optional = userRepository.findById(userId.get());
        
            if(optional.isPresent()){

                List<Post> postList = postRepository.findByUserId(userId.get());
                List<DtoPost> dtoList = new ArrayList<DtoPost>();

                for (Post post : postList) {
                    User user = post.getUser();
                    dtoList.add(new DtoPost(user.getId(),user.getUserName(),post.getTitle(),post.getText()));
                }

                return dtoList;
            }
        }else if(!userId.isPresent()){

            List<Post> postList = postRepository.findAll();
            List<DtoPost> dtoList = new ArrayList<DtoPost>();
            
            for (Post post : postList) {
                User user = post.getUser();
                dtoList.add(new DtoPost(user.getId(),user.getUserName(),post.getTitle(),post.getText()));
            }

            return dtoList; 
        }

        return null;
    }

    @Override
    public Post getOnePostById(Long postId) {
        Optional<Post> optional = postRepository.findById(postId);

        if(optional.isPresent()){
            return optional.get();
        }
        return null;
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

    @Override
    public DtoPost updateOnePost(Long postId, DtoPost updatedPost) {
        Optional<Post> optional = postRepository.findById(postId); 

        if(optional.isPresent()){
            Post post = optional.get();
            BeanUtils.copyProperties(updatedPost, post);
            post = postRepository.save(post);
            DtoPost dtoPost = new DtoPost();
            BeanUtils.copyProperties(post, dtoPost);
            return dtoPost;
        }

        return updatedPost;
    }

    @Override
    public DtoPost deleteOnePost(Long post_id) {
        
        Optional<Post> optional = postRepository.findById(post_id);

        if(optional.isPresent()){
            DtoPost copy = new DtoPost();
            Post post = optional.get();

            BeanUtils.copyProperties(post, copy);
            postRepository.delete(post);

            return copy;
        }
        
        return null;
    }

    

}
