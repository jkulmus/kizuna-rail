import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const { region, season } = req.query;

    const regions = await getListOfRegions();
    const routes = await getAllRoutes({ region, season });
    const seasons = await getListOfSeasons();

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        selectedRegion: region || '',
        selectedSeason: season || ''
    });
};
