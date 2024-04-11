package com.artragazzi.produtos.service;
import com.artragazzi.produtos.model.entities.Product;
import com.artragazzi.produtos.model.entities.ResponseModel;
import com.artragazzi.produtos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {


    @Autowired
    ResponseModel responseModel;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll(){
        return productRepository.findAll();
    }

    public ResponseEntity<?> insert(Product obj){
        if(obj.getNome().equals("")){
            responseModel.setMensagem("Name Required");
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        }else if(obj.getMarca().equals("")){
            responseModel.setMensagem("Brand Required");
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<Product>(productRepository.save(obj),HttpStatus.CREATED);
        }
    }
    public ResponseEntity<?> update(Long id, Product obj){
        if(obj.getNome().equals("")){
            responseModel.setMensagem("Name Required");
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        }else if(obj.getMarca().equals("")){
            responseModel.setMensagem("Brand Required");
            return new ResponseEntity<ResponseModel>(responseModel, HttpStatus.BAD_REQUEST);
        }else{
            Product prod = productRepository.getReferenceById(id);
            updateData(prod,obj);
            return new ResponseEntity<Product>(productRepository.save(prod),HttpStatus.OK);
        }

    }
    private void updateData(Product prod, Product obj) {
        prod.setNome(obj.getNome());
        prod.setMarca(obj.getMarca());
    }

    public ResponseEntity<ResponseModel> remove(Long id){
        productRepository.deleteById(id);
        responseModel.setMensagem("Product Removed");
        return new ResponseEntity<ResponseModel>(responseModel,HttpStatus.OK);

    }

}
