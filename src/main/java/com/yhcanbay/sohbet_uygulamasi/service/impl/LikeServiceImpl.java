package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yhcanbay.sohbet_uygulamasi.entities.Like;
import com.yhcanbay.sohbet_uygulamasi.repository.ILikeRepository;
import com.yhcanbay.sohbet_uygulamasi.service.ILikeService;

@Service
public class LikeServiceImpl implements ILikeService{

    @Autowired
    ILikeRepository likeRepository;

    @Override
    public List<Like> getAllLikes(){

        
        return null;
    }
}
