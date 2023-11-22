import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  encapsulation: ViewEncapsulation.None //para sobreescribir estilos del angular mat
})
export class ChartsComponent implements OnInit {
  initialLetter = [];
  contactsByFullName = [];
  emailExtension = [];
  phonePrefixData = [];

  valuePerCategories = {};
  theBig5 = {};
  prodSameLenCat = {};
  productsYear = {};
  contact: any;

  constructor(private contactsService: ContactsService, private productsService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(data =>{
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtension = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);

      if(!this.contact.apellido_2){ 
        this.contact.apellido_2 = "";
      }
    })
    
    this.productsService.getProducts().subscribe(data =>{
      this.categoryService.getCategory().subscribe(data2 =>{
        this.valuePerCategories = this.calculateCuantityProductsInCategory(data,data2);
        this.theBig5 = this.fiveElemBigStock(data);
        this.prodSameLenCat = this.calculateProdSameLenCat(data,data2);
        this.productsYear = this. calculateProductPerYears(data);
      })
    })
  }

  calculateInitialLettersData(contacts:any[]): any{
    return contacts.reduce((result, contact)=>{
      const initial = contact.apellido_1.charAt(0).toUpperCase();
      if(result.find(item => item.name === initial)){
        result.find(item => item.name === initial).value++
      }else{
        result.push({name: initial, value: 1})
      }
      return result;
    }, [])
  }

  calculateContactsByFullNameData(contacts: any[]): any{
    let tempContactsByFullName = [{
      name: 'Contacts',
      series: []
  }];
    contacts.forEach(contact =>{
      let fullName = contact.name + contact.apellido_1 + contact.apellido_2;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} ch.`;
      let existingRange = tempContactsByFullName[0].series.find(item => item.name === range);
      if(existingRange){
        existingRange.value++;
      }else{
        tempContactsByFullName[0].series.push({name: range, value: 1});
      }
    });

    return tempContactsByFullName.map(entry =>{
      return{
        ...entry,
        series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
      }
    })
  }

  calculateEmailExtensionsData(contacts: any[]): any{
    let emailExtensionsMap = new Map<string, number>();

    contacts.forEach(contact =>{
      let emailParts = contact.email.split('@');
      if(emailParts.length == 2){
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf('.');
        if(firstDotIndex != -1){
          const extension = domain.substring(firstDotIndex);
          if(emailExtensionsMap.has(extension)){
            emailExtensionsMap.set(extension, emailExtensionsMap.get(extension)+1)
          }else{
            emailExtensionsMap.set(extension,1);
          }
        }
      }
    });

    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) => {
      emailExtensions.push({name:key, value: value});
    });
    return emailExtensions;
  }

  generatePhonePrefixData(contacts: any[]): any{
    let phonePrefixData = [];
    let prefixCounts = {}; //crea objeto
    contacts.forEach(contact =>{
      let positionEndPref = contact.telefono.search(/\s/);
      var phonePrefix = contact.telefono.substring(0,positionEndPref);
      if(phonePrefix == "+"){
        var phonePrefix = contact.telefono.substring(1,positionEndPref);
      }

      if(prefixCounts[phonePrefix]){
        prefixCounts[phonePrefix]++;
      }else{
        prefixCounts[phonePrefix] = 1;
      }
    });

    for(let prefix in prefixCounts){
      if(prefixCounts.hasOwnProperty(prefix)){
        phonePrefixData.push({name: prefix, value: prefixCounts[prefix]})
      }
    }
    return phonePrefixData;
  }

  //--------------------PRODUCTS---------------------------------------

  calculateCuantityProductsInCategory(products,category: any[]): any{
    const total = [];
    const total2 = [];
    var categoryData = []; //array de objetos
    var newCategory = {};
    
      for(let i=0;i<category.length;i++){
        total[i]=0;
        total2[i]=0;
        for(let j=0;j<products.length;j++){
          if(products[j].category.name == category[i].name){
            total[i]+=(products[j].stock * products[j].price);
            total2[i]+=products[j].stock;
          }
        }
        addCategory(category[i].name,"price",total[i],"stock",total2[i]);
      }
    
    function addCategory(name, price, value, stock, value2){
      newCategory = {
        "name": name,
        "series": [{
          "name": price,
          "value": value
        },
        {
          "name": stock,
          "value": value2
        }]
     
      } 
      categoryData.push(newCategory);
    }

    return categoryData; 
  }

  fiveElemBigStock(products: any[]): any{
    const limit = 5;
    let group5elem = [];
    let newElement = {};

    products.sort((a,b) => b.stock - a.stock);

    for(let i=0;i<limit;i++){
      products[i];
      addElement(products[i].name,products[i].stock)
    }

    function addElement(name, value){
      newElement = {
        "name": name,
        "value": value
      }
      group5elem.push(newElement);
    }

    return group5elem;
  }

  calculateProdSameLenCat(products,category: any[]): any{
    const regex = /\s/;
    let cuantity = [];
    let newCuantCat = {};
    let prodLenCat = [];
  
    for(let i=0;i<category.length;i++){
      cuantity[i] = 0;
      for(let j=0;j<products.length;j++) {
        if(regex.test(products[j].name)){
          let prodNam = products[j].name.split(regex);
          let cuant = 0;
          for(let k=0;k<prodNam.length;k++){
            if(prodNam[k].length == products[j].category.name.length
            && products[j].category.name == category[i].name){
              cuant ++;
              if(cuant < 2){
                cuantity[i]++;
              }
            }
          }
        }else if(products[j].name.length == products[j].category.name.length
        && products[j].category.name == category[i].name){
          cuantity[i]++;
        }
      }
      addCuantToCat(category[i].name,cuantity[i]);
    }

    function addCuantToCat(name,value){
      newCuantCat = {
        "name": name,
        "value": value
      }

      prodLenCat.push(newCuantCat);
    }

    prodLenCat.sort((a,b) => b.name.length - a.name.length)

    return prodLenCat;
  }

  calculateProductPerYears(products: any[]): any{
    products.sort((a, b) => b.price - a.price);
    var expensivestProducts = [];
    var newProduct = {};

    let x = 10;
    for (let i = 0; i < x; i++) {
      var expresionRegular = /\d{4}/;

      addProduct(
        products[i].name,
        products[i].price,
        products[i].date_added.match(expresionRegular)[0]
      );
    }

    function addProduct(name, price, date) {
      newProduct = {
        "name": name,
        "series": [{
            "name": date,
            "value": price,
          }]
      };
      expensivestProducts.push(newProduct);
    }
    return expensivestProducts;
  }
}
