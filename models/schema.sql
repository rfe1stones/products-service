DROP TABLE IF EXISTS products;
CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(100),
  slogan CHAR(255),
  description CHAR(255),
  category CHAR(100),
  default_price DECIMAL(6, 2)
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  feature_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  feature CHAR(100),
  value CHAR(100),
  KEY product_id (product_id)
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  style_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  name CHAR(255),
  original_price DECIMAL(6,2),
  sale_price DECIMAL(6,2),
  default_style TINYINT(1),
  KEY product_id (product_id)
);

DROP TABLE IF EXISTS style_photos;
CREATE TABLE style_photos (
  photo_id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT REFERENCES styles(style_id),
  thumbnail_url CHAR(255),
  url CHAR(255),
  KEY style_id (style_id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  sku_id INT AUTO_INCREMENT PRIMARY KEY,
  style_id INT REFERENCES styles(style_id),
  quantity INT,
  size CHAR(10),
  KEY style_id (style_id)
);

DROP TABLE IF EXISTS related_products;
CREATE TABLE related_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT REFERENCES products(product_id),
  related_id INT REFERENCES products(product_id),
  KEY product_id (product_id)
);

