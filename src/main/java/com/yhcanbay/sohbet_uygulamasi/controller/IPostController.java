package com.yhcanbay.sohbet_uygulamasi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.yhcanbay.sohbet_uygulamasi.entities.Post;

public interface IPostController {
    
    public List<Post> getAllPosts(@RequestParam Optional<Long> userId);

    public Post getOnePost(@PathVariable Long postId);

    public Post createOnePost(@RequestBody Post newPost);
}
