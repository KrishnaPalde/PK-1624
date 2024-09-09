const express = require('express');
const router = express.Router();
const { saveGlobalSettings, editGlobalSettings, getGlobalSettings, getGatewaySettings} = require('../controller/globalSettingsController');

router.post('/admin/global-settings', saveGlobalSettings);
router.put('/admin/global-settings/:id', editGlobalSettings);
router.get('/admin/global-settings', getGlobalSettings);
router.get('/admin/gateway-settings', getGatewaySettings);
module.exports = router;
