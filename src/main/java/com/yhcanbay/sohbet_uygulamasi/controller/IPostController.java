package com.yhcanbay.sohbet_uygulamasi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoPost;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;

public interface IPostController {
    
    public List<DtoPost> getAllPosts(@RequestParam Optional<Long> userId);

    public Post getOnePost(@PathVariable Long postId);

    public DtoPost createOnePost(@RequestBody DtoPost newPost);

    DtoPost updateOnePost(Long post_id, DtoPost updatedPost);

    DtoPost deleteOnePost(Long post_id);
}
