package com.nova.nova_backened.repository;

import com.nova.nova_backened.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}