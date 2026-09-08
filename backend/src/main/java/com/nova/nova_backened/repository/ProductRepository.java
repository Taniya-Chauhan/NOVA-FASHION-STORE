package com.nova.nova_backened.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nova.nova_backened.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
