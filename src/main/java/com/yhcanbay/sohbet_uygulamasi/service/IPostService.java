package com.yhcanbay.sohbet_uygulamasi.service;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.entities.Post;

public interface IPostService {
    public List<Post> getAllPosts(Optional<Long> userId);

    public Post getOnePostById(Long postId);

    public Post createOnePost(Post newPost);
}
