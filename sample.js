"use strict";

var wd = require("wd");
const assert = require("assert");

var config = require("./helper/config.js");
    host = config.host
    desiredCaps = config.desiredCaps;
    
async function testAddPlant() {  
    let driver = await wd.promiseChainRemote(host);

    await driver.init(desiredCaps);
    await driver.setImplicitWaitTimeout(10000);
    
    let addPlantBtn = await driver.element('id', "add_plant");
    await addPlantBtn.click();

    var plantElements = await driver.elements('id', 'plant_item_title');
    let appleElement = await plantElements[0]
    await appleElement.click();

    let addBtn = await driver.element('id', 'fab');
    await addBtn.click();

    let addedPlant = await driver.element('id', 'snackbar_text');
    let addText = await  addedPlant.text();

    assert.equal(addText, "Added plant to garden");
}

testAddPlant()