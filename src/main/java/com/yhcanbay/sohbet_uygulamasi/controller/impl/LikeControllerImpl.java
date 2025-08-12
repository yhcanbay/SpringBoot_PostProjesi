package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.ILikeController;
import com.yhcanbay.sohbet_uygulamasi.service.ILikeService;

@RestController
@RequestMapping(path = "/likes")
public class LikeControllerImpl implements ILikeController{

    @Autowired 
    ILikeService likeService;
}
