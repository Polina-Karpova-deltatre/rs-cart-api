INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
(uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN'),
(uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('30598b2e-5aa7-4c79-8dc7-31825cbe9e41', '57792e85-4db5-46d6-923a-968686ce1351', 2),
('30598b2e-5aa7-4c79-8dc7-31825cbe9e41', '1f2e305a-772b-4ccf-83d4-924b5e3a7eca', 1),
('c5acbffe-dab2-474c-978d-99a7f3358171', '57792e85-4db5-46d6-923a-968686ce1351', 1),
('c5acbffe-dab2-474c-978d-99a7f3358171', '1f2e305a-772b-4ccf-83d4-924b5e3a7eca', 4);