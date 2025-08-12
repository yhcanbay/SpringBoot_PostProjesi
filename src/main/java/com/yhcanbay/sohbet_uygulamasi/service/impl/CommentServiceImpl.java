package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoComment;
import com.yhcanbay.sohbet_uygulamasi.entities.Comment;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.repository.ICommentRepository;
import com.yhcanbay.sohbet_uygulamasi.repository.IPostRepository;
import com.yhcanbay.sohbet_uygulamasi.repository.IUserRepository;
import com.yhcanbay.sohbet_uygulamasi.service.ICommentService;


@Service
public class CommentServiceImpl implements ICommentService{

    @Autowired
    ICommentRepository commentRepository;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IPostRepository postRepository;


    @Transactional(readOnly = true)
    @Override
    public List<DtoComment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        
        List<Comment> commentList = new ArrayList<>();
        List<DtoComment> dtoList = new ArrayList<>();

        if(userId.isPresent() && postId.isPresent()){
            commentList = commentRepository.findByUserIdAndPostId(userId.get(),postId.get());
        }else if(userId.isPresent()){
            commentList = commentRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            commentList = commentRepository.findByPostId(postId.get());
        }else{
            commentList = commentRepository.findAll();
        }
        
        for (Comment comment : commentList) {
            DtoComment dtoComment = new DtoComment();
            dtoComment.setText(comment.getText());
            dtoComment.setPostId(comment.getPost().getId());
            dtoComment.setUserId(comment.getUser().getId());

            dtoList.add(dtoComment);
        }
        
        
        return dtoList;
    }

    @Override
    public DtoComment getOneComment(Long commentId) {

        Optional<Comment> optional = commentRepository.findById(commentId);

        if(optional.isPresent()){
            Comment comment = optional.get();
            DtoComment dtoComment = new DtoComment();

            BeanUtils.copyProperties(comment, dtoComment);

            dtoComment.setPostId(comment.getPost().getId());
            dtoComment.setUserId(comment.getUser().getId());

            return dtoComment;

        }

        return null;
    }

    @Override
    public DtoComment createOneComment(DtoComment dtoComment){
        
        Comment comment = new Comment();
        Optional<User> optUser = userRepository.findById(dtoComment.getUserId());
        Optional<Post> optPost = postRepository.findById(dtoComment.getPostId());

        if(optPost.isPresent() && optUser.isPresent()){
            comment.setPost(optPost.get());
            comment.setUser(optUser.get());
            comment.setText(dtoComment.getText());

            commentRepository.save(comment);

            return dtoComment;
        }

        return null;
    }

    @Override
    public DtoComment updateComment(Long commentId , DtoComment dtoComment){
        
        Optional<Comment> optional = commentRepository.findById(commentId);

        if(optional.isPresent()){
            Comment comment = optional.get();

            comment.setText(dtoComment.getText());

            commentRepository.save(comment);

            DtoComment updatedComment = new DtoComment(comment.getUser().getId(), comment.getPost().getId(),comment.getText());

            return updatedComment;
        }
        
        return null;
    }

    @Override
    public DtoComment deleteComment(Long commentId){
        Optional<Comment> optional = commentRepository.findById(commentId);

        if(optional.isPresent()){
            Comment comment = optional.get();

            DtoComment deletedComment = new DtoComment(comment.getUser().getId(), comment.getPost().getId(),comment.getText());
        
            commentRepository.delete(comment);

            return deletedComment;
        }

        return null;
    }

}
