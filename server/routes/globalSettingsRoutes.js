const express = require('express');
const router = express.Router();
const { saveGlobalSettings, editGlobalSettings, getGlobalSettings, } = require('../controller/globalSettingsController');

router.post('/admin/global-settings', saveGlobalSettings);
router.put('/admin/global-settings/:id', editGlobalSettings);
router.get('/admin/global-settings', getGlobalSettings);

module.exports = router;
