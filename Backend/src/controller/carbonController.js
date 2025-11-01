const carbonService = require('../service/carbonService');

async function addCarbonRecord(req, res) {
  try {
    const userId = req.user.id;
    const {category, item, amount } = req.body;
    const result = await carbonService.recordCarbon(userId, category, item, amount);
    res.status(201).json({
      message: 'Data karbon berhasil disimpan',
      data: result
    });
  } catch (error) {
    console.error('Error recording carbon:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addCarbonTransport(req,res){
    try {
        const userId = req.user.id;
        const { transportMode, distance } = req.body;
        const result = await carbonService.recordTransportCarbon(userId, transportMode, distance);
        res.status(201).json({
            message: 'Data karbon transportasi berhasil disimpan',
            data: result
        });
    } catch (error) {
        console.error('Error recording transport carbon:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getCarbonStats(req, res) {
  try {
    const userId = req.params.userId;
    const stats = await carbonService.getUserCarbonStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching carbon stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addCarbonRecord, getCarbonStats };
