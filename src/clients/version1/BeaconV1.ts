
import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class BeaconV1 implements IStringIdentifiable {
    public id: string;
    public site_id: string;
    public type?: string;
    public udi: string;
    public label?: string;
    public center?: any; // GeoJson
    public radius?: number;
}