DROP TABLE IF EXISTS products;
CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(100),
  slogan CHAR(255),
  description CHAR(255),
  category CHAR(100),
  default_price DECIMAL(6, 2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  feature_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  feature CHAR(100),
  value CHAR(100)
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  style_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  name CHAR(255),
  original_price DECIMAL(6,2),
  sale_price DECIMAL(6,2),
  default TINYINT(1)
);

DROP TABLE IF EXISTS style_photos;
CREATE TABLE style_photos (
  photo_id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT REFERENCES styles(style_id),
  thumbnail_url CHAR(255),
  url CHAR(255)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  sku_id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT REFERENCES styles(style_id),
  quantity INT,
  size INT
);

DROP TABLE IF EXISTS related_products;
CREATE TABLE related_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  related_id INT REFERENCES products(product_id)
);

