package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.IPostController;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoPost;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;
import com.yhcanbay.sohbet_uygulamasi.service.impl.PostServiceImpl;

@RestController
@RequestMapping("/posts")
public class PostControllerImpl implements IPostController {

    @Autowired
    private PostServiceImpl postService;

    @GetMapping()
    public List<Post> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
    }

    @GetMapping(path = "/{post_id}")
    public Post getOnePost(@PathVariable Long postId){
        return postService.getOnePostById(postId);
    }
    @PostMapping
    @Override
    public DtoPost createOnePost(@RequestBody DtoPost newPost) {
        return null;
    }
}
