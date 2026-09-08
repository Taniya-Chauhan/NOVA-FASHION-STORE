package com.nova.nova_backened.controller;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;


    // =========================
    // CREATE RAZORPAY ORDER
    // =========================

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody Map<String, Object> request) {

        try {

            double amount = Double.parseDouble(
                    request.get("amount").toString()
            );

            // Razorpay amount is in paise
            long amountInPaise = Math.round(amount * 100);

            String receipt =
                    "NOVA_" + System.currentTimeMillis();

            String url =
                    "https://api.razorpay.com/v1/orders";


            Map<String, Object> orderRequest =
                    new HashMap<>();

            orderRequest.put(
                    "amount",
                    amountInPaise
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    receipt
            );


            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            headers.setBasicAuth(
                    razorpayKeyId,
                    razorpayKeySecret
            );


            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            orderRequest,
                            headers
                    );


            RestTemplate restTemplate =
                    new RestTemplate();


            ResponseEntity<Map<String, Object>> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            new ParameterizedTypeReference<
                                    Map<String, Object>>() {}
                    );


            return ResponseEntity.ok(
                    response.getBody()
            );


        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "error",
                                    "Unable to create Razorpay order",

                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================
    // VERIFY RAZORPAY PAYMENT
    // =========================

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, String> request) {

        try {

            String orderId =
                    request.get("razorpay_order_id");

            String paymentId =
                    request.get("razorpay_payment_id");

            String signature =
                    request.get("razorpay_signature");


            // Create the signature payload
            String payload =
                    orderId + "|" + paymentId;


            // HMAC SHA256
            Mac mac =
                    Mac.getInstance("HmacSHA256");


            SecretKeySpec secretKey =
                    new SecretKeySpec(
                            razorpayKeySecret.getBytes(
                                    StandardCharsets.UTF_8
                            ),
                            "HmacSHA256"
                    );


            mac.init(secretKey);


            byte[] hash =
                    mac.doFinal(
                            payload.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );


            // Convert hash to hexadecimal
            StringBuilder generatedSignature =
                    new StringBuilder();


            for (byte b : hash) {

                generatedSignature.append(
                        String.format(
                                "%02x",
                                b
                        )
                );
            }


            // Compare signatures
            if (generatedSignature
                    .toString()
                    .equals(signature)) {

                return ResponseEntity.ok(
                        Map.of(
                                "success",
                                true,

                                "message",
                                "Payment verified successfully"
                        )
                );
            }


            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "success",
                                    false,

                                    "message",
                                    "Payment verification failed"
                            )
                    );


        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            Map.of(
                                    "success",
                                    false,

                                    "message",
                                    "Verification error",

                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }
}