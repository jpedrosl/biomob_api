import { User } from './User';
import { ReflorestationAreas } from './ReflorestationAreas';
import { CommunityGarden } from './CommunityGarden';
import { NewsCategory } from './NewsCategory';
import { Tag } from './Tag';
import { News } from './News';
import { RefreshToken } from './RefreshToken';
import { ResetCode } from './ResetCode';
import Seedling from './Seedling';
import { Event } from './Event';
import { GardenPlot } from './GardenPlot';
import { EducationalMaterial } from './EducationalMaterial';
import { NewsComment } from './NewsComment';
import { NewsMedia } from './NewsMedia';
import { EventParticipant } from './EventParticipant';
import { NewsToCategory } from './NewsToCategory';
import { NewsToTag } from './NewsToTag';
import { SeedlingGrowthRecord } from './SeedlingGrowthRecord';

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'RefreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'User' });

User.hasMany(ResetCode, { foreignKey: 'userId', as: 'ResetCodes' });
ResetCode.belongsTo(User, { foreignKey: 'userId', as: 'User' });

ReflorestationAreas.hasMany(Seedling, { foreignKey: 'reforestationAreaId', as: 'Seedlings' });
Seedling.belongsTo(ReflorestationAreas, { foreignKey: 'reforestationAreaId', as: 'ReflorestationArea' });

Seedling.hasMany(SeedlingGrowthRecord, { foreignKey: 'seedlingId', as: 'GrowthRecords' });
SeedlingGrowthRecord.belongsTo(Seedling, { foreignKey: 'seedlingId', as: 'Seedling' });

User.hasMany(SeedlingGrowthRecord, { foreignKey: 'recordedBy', as: 'RecordedGrowthRecords' });
SeedlingGrowthRecord.belongsTo(User, { foreignKey: 'recordedBy', as: 'RecordedBy' });

User.hasMany(CommunityGarden, { foreignKey: 'contactPerson', as: 'ContactGardens' });
CommunityGarden.belongsTo(User, { foreignKey: 'contactPerson', as: 'ContactPerson' });

CommunityGarden.hasMany(GardenPlot, { foreignKey: 'gardenId', as: 'GardenPlots' });
GardenPlot.belongsTo(CommunityGarden, { foreignKey: 'gardenId', as: 'Garden' });

User.hasMany(GardenPlot, { foreignKey: 'assignedTo', as: 'AssignedPlots' });
GardenPlot.belongsTo(User, { foreignKey: 'assignedTo', as: 'AssignedUser' });

User.hasMany(Event, { foreignKey: 'createdBy', as: 'CreatedEvents' });
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'CreatedByUser' });

ReflorestationAreas.hasMany(Event, { foreignKey: 'reforestationAreaId', as: 'Events' });
Event.belongsTo(ReflorestationAreas, { foreignKey: 'reforestationAreaId', as: 'ReflorestationArea' });

CommunityGarden.hasMany(Event, { foreignKey: 'gardenId', as: 'Events' });
Event.belongsTo(CommunityGarden, { foreignKey: 'gardenId', as: 'Garden' });

Event.hasMany(EventParticipant, { foreignKey: 'eventId', as: 'Participants' });
EventParticipant.belongsTo(Event, { foreignKey: 'eventId', as: 'Event' });

User.hasMany(EventParticipant, { foreignKey: 'userId', as: 'EventParticipations' });
EventParticipant.belongsTo(User, { foreignKey: 'userId', as: 'User' });

User.hasMany(EducationalMaterial, { foreignKey: 'uploadedBy', as: 'UploadedMaterials' });
EducationalMaterial.belongsTo(User, { foreignKey: 'uploadedBy', as: 'UploadedBy' });

User.hasMany(News, { foreignKey: 'authorId', as: 'AuthoredNews' });
News.belongsTo(User, { foreignKey: 'authorId', as: 'Author' });

News.hasMany(NewsComment, { foreignKey: 'newsId', as: 'Comments' });
NewsComment.belongsTo(News, { foreignKey: 'newsId', as: 'News' });

User.hasMany(NewsComment, { foreignKey: 'userId', as: 'AuthoredComments' });
NewsComment.belongsTo(User, { foreignKey: 'userId', as: 'User' });

NewsComment.hasMany(NewsComment, { foreignKey: 'parentCommentId', as: 'Replies' });
NewsComment.belongsTo(NewsComment, { foreignKey: 'parentCommentId', as: 'ParentComment' });

News.hasMany(NewsMedia, { foreignKey: 'newsId', as: 'Media' });
NewsMedia.belongsTo(News, { foreignKey: 'newsId', as: 'News' });

News.belongsToMany(NewsCategory, { through: NewsToCategory, foreignKey: 'newsId', otherKey: 'categoryId', as: 'Categories' });
NewsCategory.belongsToMany(News, { through: NewsToCategory, foreignKey: 'categoryId', otherKey: 'newsId', as: 'News' });
NewsToCategory.belongsTo(News, { foreignKey: 'newsId', as: 'News' });
NewsToCategory.belongsTo(NewsCategory, { foreignKey: 'categoryId', as: 'Category' });

News.belongsToMany(Tag, { through: NewsToTag, foreignKey: 'newsId', otherKey: 'tagId', as: 'Tags' });
Tag.belongsToMany(News, { through: NewsToTag, foreignKey: 'tagId', otherKey: 'newsId', as: 'News' });
NewsToTag.belongsTo(News, { foreignKey: 'newsId', as: 'News' });
NewsToTag.belongsTo(Tag, { foreignKey: 'tagId', as: 'Tag' });

export {
    User,
    RefreshToken,
    ResetCode,
    ReflorestationAreas,
    Seedling,
    SeedlingGrowthRecord,
    CommunityGarden,
    GardenPlot,
    Event,
    EventParticipant,
    EducationalMaterial,
    News,
    NewsCategory,
    NewsToCategory,
    Tag,
    NewsToTag,
    NewsComment,
    NewsMedia,
};
