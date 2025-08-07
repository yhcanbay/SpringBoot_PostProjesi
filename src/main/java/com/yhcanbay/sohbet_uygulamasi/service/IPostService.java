package com.yhcanbay.sohbet_uygulamasi.service;

import java.util.List;
import java.util.Optional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoPost;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;

public interface IPostService {
    public List<Post> getAllPosts(Optional<Long> userId);

    public Post getOnePostById(Long postId);

    public DtoPost createOnePost(DtoPost newPost);

    public DtoPost updateOnePost(Long postId, DtoPost updatedPost);

    public DtoPost deleteOnePost(Long post_id);
}
