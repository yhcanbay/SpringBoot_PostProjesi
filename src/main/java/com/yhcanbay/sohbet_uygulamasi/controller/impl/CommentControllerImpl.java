package com.yhcanbay.sohbet_uygulamasi.controller.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yhcanbay.sohbet_uygulamasi.controller.ICommentController;
import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;
import com.yhcanbay.sohbet_uygulamasi.service.ICommentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/comments")
public class CommentControllerImpl implements ICommentController {

    @Autowired
    ICommentService commentService;

    
    @Override
    @GetMapping
    public List<DtoComment> getAllComments(@RequestParam Optional<Long> userId,@RequestParam Optional<Long> postId) {
        return commentService.getAllComments(userId,postId);
    }

    @Override
    @GetMapping(path = "/{commentId}")
    public DtoComment getOneComment(@PathVariable Long commentId) {
        return commentService.getOneComment(commentId);
    }

    @Override
    @PostMapping()
    public DtoComment createOneComment(@RequestBody DtoComment dtoComment) {
        return commentService.createOneComment(dtoComment);
    }
    
    

}