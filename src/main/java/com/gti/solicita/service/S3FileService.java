package com.gti.solicita.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.gti.solicita.entities.S3File;
import com.gti.solicita.repositories.S3FileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.Objects;

@Service
public class S3FileService {
    private static final Logger logger = LoggerFactory.getLogger(S3FileService.class);
    private final S3FileRepository fileRepository;
    @Value("${s3.bucket.name}")
    String bucket;
    @Value("${s3.bucket.region}")
    String region;
    @Value("${amazon.s3.acess-key}")
    String accessKey;
    @Value("${amazon.s3.secret-key}")
    String secretKey;
    @Value("${s3.bucket.folder}")
    String folder;

    AmazonS3 s3;

    public S3FileService(S3FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostConstruct
    private void initBucketS3() {
        try {
            BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
            s3 = AmazonS3ClientBuilder.standard().withRegion(region)
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .build();
        } catch (AmazonClientException e) {
            logger.error(e.getMessage());
            e.printStackTrace();
        }
    }

    public boolean uploadFile(MultipartFile multipartFile) {
        try {
            File file = convertToFile(multipartFile);
            String fileName = generateNameFile(multipartFile);
            String fileUrl = getUrlFileS3() + fileName;
            logger.info(fileName.trim());
            if (uploadS3(folder + "/" + fileName, file)) {
                S3File s3File = new S3File(fileName, multipartFile.getContentType(), Instant.now());
                fileRepository.save(s3File);

                logger.info(fileUrl);
            }
            file.delete();
            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return false;
    }

    private File convertToFile(MultipartFile file) throws IOException {
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream stream = new FileOutputStream(convertFile);
        stream.write(file.getBytes());
        stream.close();
        return convertFile;
    }

    private String generateNameFile(MultipartFile file) {
        return new Date().getTime() + "-" + Objects.requireNonNull(file.getOriginalFilename()).trim();
    }

    public String getUrlFileS3() {
        String url = "https://" + bucket + ".s3." + "amazonaws.com" + "/" + folder + "/";
        return url;
    }

    private boolean uploadS3(String fileName, File file) {
        try {
            PutObjectResult objectResult = s3.putObject(new PutObjectRequest(bucket, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return false;
    }

    public byte[] getFile(String fileName) {
        byte[] bytes = null;
        try {
            S3Object object = s3.getObject(new GetObjectRequest(bucket, fileName));
            bytes = IOUtils.toByteArray(object.getObjectContent());
        } catch (Exception e) {
            logger.error(e.getMessage());

        }
        return bytes;
    }

}
