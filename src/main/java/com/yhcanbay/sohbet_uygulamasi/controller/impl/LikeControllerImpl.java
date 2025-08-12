package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.ILikeController;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoLike;
import com.yhcanbay.sohbet_uygulamasi.service.ILikeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping(path = "/likes")
public class LikeControllerImpl implements ILikeController{

    @Autowired 
    ILikeService likeService;

    @Override
    @GetMapping()
    public List<DtoLike> getAllLikes(@RequestParam Optional<Long> userId ,@RequestParam Optional<Long> postId) {
        return likeService.getAllLikes(userId, postId);
    }

    @Override
    @GetMapping(path = "/{likeId}")
    public DtoLike getOneLike(@PathVariable Long likeId) {
        return likeService.getOneLike(likeId);
    }
    
    
}
