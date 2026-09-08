package com.nova.nova_backened.controller;

import com.nova.nova_backened.model.Order;
import com.nova.nova_backened.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Save a new order
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order) {

        Order savedOrder =
                orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderRepository.findAll()
        );
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id) {

        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }
}