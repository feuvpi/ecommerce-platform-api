import { Router } from 'express';
import Product from '../models/product.model';

class ProductController {
  public router = Router();

  constructor() {
    this.router.post('/', this.createProduct);
    this.router.get('/:id', this.getProduct);
    this.router.put('/:id', this.updateProduct);
    this.router.delete('/:id', this.deleteProduct);
  }

  public async createProduct(req, res, next) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  public async getProduct(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  public async updateProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  public async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController().router;
