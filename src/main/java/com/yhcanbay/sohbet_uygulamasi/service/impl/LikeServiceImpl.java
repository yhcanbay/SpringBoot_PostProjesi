package com.yhcanbay.sohbet_uygulamasi.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yhcanbay.sohbet_uygulamasi.dto.DtoLike;
import com.yhcanbay.sohbet_uygulamasi.entities.Like;
import com.yhcanbay.sohbet_uygulamasi.entities.Post;
import com.yhcanbay.sohbet_uygulamasi.entities.User;
import com.yhcanbay.sohbet_uygulamasi.repository.ILikeRepository;
import com.yhcanbay.sohbet_uygulamasi.repository.IPostRepository;
import com.yhcanbay.sohbet_uygulamasi.repository.IUserRepository;
import com.yhcanbay.sohbet_uygulamasi.service.ILikeService;

@Service
public class LikeServiceImpl implements ILikeService{

    @Autowired
    ILikeRepository likeRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    IPostRepository postRepository;

    @Transactional(readOnly = true)
    @Override
    public List<DtoLike> getAllLikes(Optional<Long> userId,Optional<Long> postId ){

        List<Like> likeList = new ArrayList<>();
        List<DtoLike> dtoList = new ArrayList<>();

        if(userId.isPresent() && postId.isPresent()){
            likeList = likeRepository.findByUserIdAndPostId(userId.get(),postId.get());
        }else if(userId.isPresent()){
            likeList = likeRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            likeList = likeRepository.findByPostId(postId.get());
        }else{
            likeList = likeRepository.findAll();
        }
        
        for (Like like : likeList) {
            DtoLike dtoLike = new DtoLike();
            dtoLike.setPostId(like.getPost().getId());
            dtoLike.setUserId(like.getUser().getId());
            dtoLike.setId(like.getId());

            dtoList.add(dtoLike);
        }
        
        
        return dtoList;
    }

    @Override
    public DtoLike getOneLike(Long likeId){

        Optional<Like> optional = likeRepository.findById(likeId);

        if(optional.isPresent()){
            Like like = optional.get();
            DtoLike dtoLike = new DtoLike();

            dtoLike.setPostId(like.getPost().getId());
            dtoLike.setUserId(like.getUser().getId());
            dtoLike.setId(like.getId());

            return dtoLike;
        }

        return null;
    }

    @Override
    public DtoLike createLike(DtoLike dtoLike){

        Optional<User> user = userRepository.findById(dtoLike.getUserId());
        Optional<Post> post = postRepository.findById(dtoLike.getPostId());

        if(user.isPresent() && post.isPresent()){
            Like like = new Like();
            like.setPost(post.get());
            like.setUser(user.get());

            likeRepository.save(like);

            return dtoLike;
        }

        return null;
    }

    @Transactional(readOnly = true)
    @Override
    public DtoLike deleteLike(Long userId,Long postId){

        List<Like> optional = likeRepository.findByUserIdAndPostId(userId, postId);

        if(optional.size()==1){
            Like like = optional.get(0);
            DtoLike dtoLike = new DtoLike(like.getId(),like.getUser().getId(),like.getPost().getId());

            likeRepository.delete(like);

            System.out.println(like);

            return dtoLike;
        }

        return null;
    }
}
