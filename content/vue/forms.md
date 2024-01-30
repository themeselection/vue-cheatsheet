# Form Input Bindings

## Basic form input

```vue
<template>
  <!-- Text Input -->
  <input v-model="text"> {{ text }}
  
  <!-- Checkbox -->
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">Checked: {{ checked }}</label>
  
  <!-- Multi checkbox -->
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <p>Checked names: <pre>{{ checkedNames }}</pre></p>
  
  <!-- Radio -->
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  
  <span>Picked: {{ picked }}</span>
  
  <!-- Select -->
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
  
  <!-- Multi select -->
  <select v-model="multiSelected" multiple style="width:100px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ multiSelected }}</span>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNq9VUtP4zAQ/iveXLorUcoutypEAsQBJB4CbmQPaTKlBse2bKeAqvz3nbHzRAW6Fy5tZuabxzf2jDfRsdb76wqieRTb3HDtmAVX6SSVvNTKOLZhBpasZkujSjZB6CSVqcyVtI45eHXsiAA/J2cFd6yEya/WmK8gf4aisTtTwXvTVVaCbewPk4ssf5787TCaD7wn13IQ2YKA3PXG495UVsLxu7H9AQEUN54FhsgNBQelFpkDlBiLV3+SeyJzLnXl4hmKXs1JZOtpqQoQR2lEhNMoYZtN4F7XFCv4nxKphXp97+3eNKCr54zmNGK8GMt9/KYxmMIHENkCBFsqM8KHTFDMqYy2y3Udzzzcs0PfH9Mp/bPQEi0gQDEC9jzPJFtwWTCnmFsBs3gSAZ0Zk721FbF1JipvmE67Pl1SPPafbJ/wcIkpxUORznobcX8jtrEP/gn59Ty/TKpWcpi0EXdP6h0S8ts9acmfYZD0shF3Thr8E/IbJdXtsTNJrnPUGEj6GxCGia4B6fG3vQh4PrdZwdUHJ2XI1hav5LB2HLpR6WEktxXt/RLEj0pemK/yuRf6bPPdB2mHfN4vQfzWfFZnMrnxzn5GmlVCvfGmvjFhU/SdCZtlUEK7apoiEKK040qygttsITBqWzwibgRkFocpBMGexLOAHvsmxx/oTz7Qn470SMInGHBtF55n223HLXzD7H7JerRF8Ui6FWLdmyCyL7xwq/nvgwNN++g72Y0X/IBiPOs2erQXOYvvwZI/7j9ZJfFx21A4HD5Vai7AXPuEOH8YM1STRpkQ6uXC6+ix2mv1fr626J8scp/jx40BC2aNE9DZXGYeAV8KMp/dXflXozNilyuB6E+Mt2CVqKjGADupZIFlD3C+2nP/RHP5eG/PXh1I25KiQglZe3wa4bN9+gn1vtzD/UPvl8o6qv8BvGa6DQ==)
