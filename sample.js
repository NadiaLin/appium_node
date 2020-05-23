"use strict";

var wd = require("wd");
const assert = require("assert");

var config = require("./helper/config.js");
    let host = config.host
    let desiredCaps = config.desiredCaps;
    
async function testAddPlant() {      
    let driver = await setupDriver(host, desiredCaps);

    await addPlantWhenListEmpty(driver);
    await addPlantAtIndex(0, driver);
    await checkPlantAdded(driver);
}

async function setupDriver(host, desiredCaps) {
    var driver = await wd.promiseChainRemote(host);
    await driver.init(desiredCaps);
    await driver.setImplicitWaitTimeout(50000);

    return driver;
}

async function addPlantWhenListEmpty(driver) {
    let addPlantBtn = await driver.element('id', 'add_plant');
    await addPlantBtn.click();
}

async function addPlantAtIndex(index, driver) {
    var plantElements = await driver.elements('id', 'plant_item_title');
    let plant = await plantElements[index];
    await plant.click();

    let addBtn = await driver.element('id', 'fab');
    await addBtn.click();
}

async function checkPlantAdded(driver) {
    let addedPlant = await driver.element('id', 'snackbar_text');
    let addText = await addedPlant.text();
    assert.equal(addText, "Added plant to garden");
}

testAddPlant()