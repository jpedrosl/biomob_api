import express from "express";
// Importações de Middlewares de Validação
import validationBody from "./middlewares/validateBody"; // Middleware para validar o corpo da requisição com schemas Yup

// Importações de Schemas de Validação (Yup)
import loginSchema from "./validation/authSchema"; // Schema para validação de login
import userSchema from "./validation/userSchema"; // Schema para validação de criação/atualização de usuário
import reflorestationSchema from "./validation/reflorestationSchema"; // Schema para validação de áreas de reflorestamento
import seedlingSchema from "./validation/seedlingSchema"; // Schema para validação de mudas
import refreshTokenSchema from "./validation/refreshTokenSchema"; // Schema para validação de refresh token
import { requestResetCodeSchema, resetPasswordSchema } from "./validation/resetPasswordSchema"; // Schemas para redefinição de senha
import seedlingGrowthRecordSchema from "./validation/seedlingGrowthRecordSchema"; // Schema para validação de registros de crescimento de mudas
import communityGardenSchema from "./validation/communityGardenSchema"; // Schema para validação de hortas comunitárias
import gardenPlotSchema from "./validation/gardenPlotSchema"; // Schema para validação de lotes de horta
import eventSchema from "./validation/eventSchema"; // Schema para validação de eventos
import eventParticipantSchema from "./validation/eventParticipantSchema"; // Schema para validação de participantes de eventos
import educationalMaterialSchema from "./validation/educationalMaterialSchema"; // Schema para validação de materiais educacionais
import newsSchema from "./validation/newsSchema"; // Schema para validação de notícias
import newsCategorySchema from "./validation/newsCategorySchema"; // Schema para validação de categorias de notícias
import newsToCategorySchema from "./validation/newsToCategorySchema"; // Schema para validação de associação notícia-categoria
import newsToTagSchema from "./validation/newsToTagSchema"; // Schema para validação de associação notícia-tag
import tagSchema from "./validation/tagSchema"; // Schema para validação de tags
import newsCommentSchema from "./validation/newsCommentSchema"; // Schema para validação de comentários de notícias
import newsMediaSchema from "./validation/newsMediaSchema"; // Schema para validação de mídias de notícias

// Importações de Controllers
import { authController } from "./controllers/authController";
import { reflorestationController } from "./controllers/reflorestationController";
import { seedlingController } from "./controllers/seedlingController";
import { refreshTokenController } from "./controllers/refreshTokenController";
import { resetPasswordController } from "./controllers/resetPasswordController";
import { seedlingGrowthRecordController } from "./controllers/seedlingGrowthRecordController";
import { communityGardenController } from "./controllers/communityGardenController";
import { gardenPlotController } from "./controllers/gardenPlotController";
import { eventController } from "./controllers/eventController";
import { eventParticipantController } from "./controllers/eventParticipantController";
import { educationalMaterialController } from "./controllers/educationalMaterialController";
import { newsController } from "./controllers/newsController";
import { newsCategoryController } from "./controllers/newsCategoryController";
import { newsToCategoryController } from "./controllers/newsToCategoryController";
import { newsToTagController } from "./controllers/newsToTagController";
import { tagController } from "./controllers/tagController";
import { newsCommentController } from "./controllers/newsCommentController";
import { newsMediaController } from "./controllers/newsMediaController";
import { statusController } from "./controllers/statusController"; // Controller para rota de saúde

// Importações de Middlewares de Autenticação/Autorização
import { ensureAuth } from "./middlewares/auth"; // Middleware para verificar token JWT
import { ensureRole } from "./middlewares/ensureRole"; // Middleware para verificar papel do usuário

const router = express.Router();

/**
 * @section Rotas de Saúde
 * Propósito: Verificar o status de funcionamento do backend.
 */
router.get("/health", statusController.check); // GET: Retorna um status de saúde do servidor

/**
 * @section Rotas de Autenticação (Auth)
 * Propósito: Gerenciar o registro, login, refresh de token e redefinição de senha de usuários.
 */
router.post("/auth/register", validationBody(userSchema) , authController.register ); // POST: Registra um novo usuário
router.post("/auth/login", validationBody(loginSchema) , authController.login ); // POST: Realiza o login do usuário e retorna JWT
router.post("/auth/refresh-token", validationBody(refreshTokenSchema), refreshTokenController.refresh); // POST: Refreshes um token JWT
router.post("/auth/request-reset-code", validationBody(requestResetCodeSchema), resetPasswordController.requestResetCode); // POST: Solicita código para reset de senha
router.post("/auth/reset-password", validationBody(resetPasswordSchema), resetPasswordController.resetPassword); // POST: Redefine a senha do usuário

/**
 * @section Rotas de Áreas de Reflorestamento
 * Propósito: Gerenciar as informações de áreas dedicadas ao reflorestamento.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/reflorestation", ensureAuth, ensureRole(['gestor']), validationBody(reflorestationSchema), reflorestationController.create ); // POST: Cria uma nova área de reflorestamento
router.get("/reflorestation", ensureAuth, reflorestationController.findAll); // GET: Lista todas as áreas de reflorestamento
router.get("/reflorestation/:id", ensureAuth, reflorestationController.findById); // GET: Busca uma área de reflorestamento por ID
router.put("/reflorestation/:id", ensureAuth, ensureRole(['gestor']), validationBody(reflorestationSchema), reflorestationController.update); // PUT: Atualiza uma área de reflorestamento por ID
router.delete("/reflorestation/:id", ensureAuth, ensureRole(['gestor']), reflorestationController.delete); // DELETE: Deleta uma área de reflorestamento por ID

/**
 * @section Rotas de Mudas
 * Propósito: Gerenciar o registro de mudas plantadas.
 * Autorização: Criar exige papel 'gestor'.
 */
router.post("/seedling", ensureAuth, ensureRole(['gestor']), validationBody(seedlingSchema), seedlingController.create ); // POST: Cria uma nova muda

/**
 * @section Rotas de Registros de Crescimento de Mudas
 * Propósito: Gerenciar os registros de acompanhamento do crescimento de mudas.
 * Autorização: Criar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/seedling-growth-records", ensureAuth, ensureRole(['gestor']), validationBody(seedlingGrowthRecordSchema), seedlingGrowthRecordController.create); // POST: Cria um novo registro de crescimento para uma muda
router.get("/seedling-growth-records", ensureAuth, seedlingGrowthRecordController.findAll); // GET: Lista todos os registros de crescimento
router.get("/seedling-growth-records/:seedlingId", ensureAuth, seedlingGrowthRecordController.findBySeedlingId); // GET: Lista registros de crescimento por ID da muda
router.delete("/seedling-growth-records/:id", ensureAuth, ensureRole(['gestor']), seedlingGrowthRecordController.delete); // DELETE: Deleta um registro de crescimento

/**
 * @section Rotas de Hortas Comunitárias
 * Propósito: Gerenciar as informações e status de hortas comunitárias.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/community-gardens", ensureAuth, ensureRole(['gestor']), validationBody(communityGardenSchema), communityGardenController.create); // POST: Cria uma nova horta comunitária
router.get("/community-gardens", ensureAuth, communityGardenController.findAll); // GET: Lista todas as hortas comunitárias
router.get("/community-gardens/:id", ensureAuth, communityGardenController.findById); // GET: Busca uma horta comunitária por ID
router.put("/community-gardens/:id", ensureAuth, ensureRole(['gestor']), validationBody(communityGardenSchema), communityGardenController.update); // PUT: Atualiza uma horta comunitária por ID
router.delete("/community-gardens/:id", ensureAuth, ensureRole(['gestor']), communityGardenController.delete); // DELETE: Deleta uma horta comunitária por ID

/**
 * @section Rotas de Lotes de Horta (Garden Plots)
 * Propósito: Gerenciar os lotes individuais dentro das hortas comunitárias.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/garden-plots", ensureAuth, ensureRole(['gestor']), validationBody(gardenPlotSchema), gardenPlotController.create); // POST: Cria um novo lote de horta
router.get("/garden-plots", ensureAuth, gardenPlotController.findAll); // GET: Lista todos os lotes de horta
router.get("/garden-plots/:id", ensureAuth, gardenPlotController.findById); // GET: Busca um lote de horta por ID
router.get("/community-gardens/:gardenId/plots", ensureAuth, gardenPlotController.findByGardenId); // GET: Lista lotes de horta por ID da horta comunitária
router.put("/garden-plots/:id", ensureAuth, ensureRole(['gestor']), validationBody(gardenPlotSchema), gardenPlotController.update); // PUT: Atualiza um lote de horta por ID
router.delete("/garden-plots/:id", ensureAuth, ensureRole(['gestor']), gardenPlotController.delete); // DELETE: Deleta um lote de horta

/**
 * @section Rotas de Eventos
 * Propósito: Gerenciar a criação, listagem, busca, atualização e exclusão de eventos.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/events", ensureAuth, ensureRole(['gestor']), validationBody(eventSchema), eventController.create); // POST: Cria um novo evento
router.get("/events", ensureAuth, eventController.findAll); // GET: Lista todos os eventos
router.get("/events/:id", ensureAuth, eventController.findById); // GET: Busca um evento por ID
router.put("/events/:id", ensureAuth, ensureRole(['gestor']), validationBody(eventSchema), eventController.update); // PUT: Atualiza um evento por ID
router.delete("/events/:id", ensureAuth, ensureRole(['gestor']), eventController.delete); // DELETE: Deleta um evento

/**
 * @section Rotas de Participantes de Eventos
 * Propósito: Gerenciar a participação de usuários em eventos.
 * Autorização: Registro/Cancelamento exigem autenticação. Listar todos exige 'gestor'.
 */
router.post("/events/:eventId/participants", ensureAuth, validationBody(eventParticipantSchema), eventParticipantController.register); // POST: Registra um usuário em um evento
router.get("/events/:eventId/participants", ensureAuth, eventParticipantController.findByEventId); // GET: Lista participantes de um evento específico
router.get("/event-participants", ensureAuth, ensureRole(['gestor']), eventParticipantController.findAll); // GET: Lista todas as participações em eventos (apenas gestores)
router.delete("/events/:eventId/participants/:userId", ensureAuth, eventParticipantController.cancel); // DELETE: Cancela a participação de um usuário em um evento

/**
 * @section Rotas de Materiais Educacionais
 * Propósito: Gerenciar o upload, listagem e acesso a materiais educativos.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/educational-materials", ensureAuth, ensureRole(['gestor']), validationBody(educationalMaterialSchema), educationalMaterialController.create); // POST: Cria um novo material educacional
router.get("/educational-materials", ensureAuth, educationalMaterialController.findAll); // GET: Lista todos os materiais educacionais
router.get("/educational-materials/:id", ensureAuth, educationalMaterialController.findById); // GET: Busca um material educacional por ID
router.put("/educational-materials/:id", ensureAuth, ensureRole(['gestor']), validationBody(educationalMaterialSchema), educationalMaterialController.update); // PUT: Atualiza um material educacional
router.delete("/educational-materials/:id", ensureAuth, ensureRole(['gestor']), educationalMaterialController.delete); // DELETE: Deleta um material educacional
router.post("/educational-materials/:id/increment-download", ensureAuth, educationalMaterialController.incrementDownload); // POST: Incrementa o contador de downloads de um material

/**
 * @section Rotas de Notícias
 * Propósito: Gerenciar a criação, listagem, busca, atualização e exclusão de notícias.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/news", ensureAuth, ensureRole(['gestor']), validationBody(newsSchema), newsController.create); // POST: Cria uma nova notícia
router.get("/news", ensureAuth, newsController.findAll); // GET: Lista todas as notícias
router.get("/news/:id", ensureAuth, newsController.findById); // GET: Busca uma notícia por ID
router.get("/news/slug/:slug", ensureAuth, newsController.findBySlug); // GET: Busca uma notícia por slug
router.put("/news/:id", ensureAuth, ensureRole(['gestor']), validationBody(newsSchema), newsController.update); // PUT: Atualiza uma notícia
router.delete("/news/:id", ensureAuth, ensureRole(['gestor']), newsController.delete); // DELETE: Deleta uma notícia

/**
 * @section Rotas de Categorias de Notícias
 * Propósito: Gerenciar a criação, listagem, busca, atualização e exclusão de categorias de notícias.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/news-categories", ensureAuth, ensureRole(['gestor']), validationBody(newsCategorySchema), newsCategoryController.create); // POST: Cria uma nova categoria de notícia
router.get("/news-categories", ensureAuth, newsCategoryController.findAll); // GET: Lista todas as categorias de notícia
router.get("/news-categories/:id", ensureAuth, newsCategoryController.findById); // GET: Busca uma categoria por ID
router.get("/news-categories/slug/:slug", ensureAuth, newsCategoryController.findBySlug); // GET: Busca uma categoria por slug
router.put("/news-categories/:id", ensureAuth, ensureRole(['gestor']), validationBody(newsCategorySchema), newsCategoryController.update); // PUT: Atualiza uma categoria
router.delete("/news-categories/:id", ensureAuth, ensureRole(['gestor']), newsCategoryController.delete); // DELETE: Deleta uma categoria

/**
 * @section Rotas de Associações Notícia-Categoria
 * Propósito: Gerenciar a relação muitos-para-muitos entre notícias e categorias.
 * Autorização: Criar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/news/:newsId/categories/:categoryId", ensureAuth, ensureRole(['gestor']), validationBody(newsToCategorySchema), newsToCategoryController.create); // POST: Associa notícia a categoria
router.get("/news-to-categories", ensureAuth, newsToCategoryController.findAll); // GET: Lista todas as associações notícia-categoria
router.get("/news/:newsId/categories", ensureAuth, newsToCategoryController.findByNewsId); // GET: Lista categorias de uma notícia
router.get("/categories/:categoryId/news", ensureAuth, newsToCategoryController.findByCategoryId); // GET: Lista notícias de uma categoria
router.delete("/news/:newsId/categories/:categoryId", ensureAuth, ensureRole(['gestor']), newsToCategoryController.remove); // DELETE: Remove associação notícia-categoria

/**
 * @section Rotas de Tags
 * Propósito: Gerenciar a criação, listagem, busca, atualização e exclusão de tags.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/tags", ensureAuth, ensureRole(['gestor']), validationBody(tagSchema), tagController.create); // POST: Cria uma nova tag
router.get("/tags", ensureAuth, tagController.findAll); // GET: Lista todas as tags
router.get("/tags/:id", ensureAuth, tagController.findById); // GET: Busca uma tag por ID
router.get("/tags/slug/:slug", ensureAuth, tagController.findBySlug); // GET: Busca uma tag por slug
router.put("/tags/:id", ensureAuth, ensureRole(['gestor']), validationBody(tagSchema), tagController.update); // PUT: Atualiza uma tag
router.delete("/tags/:id", ensureAuth, ensureRole(['gestor']), tagController.delete); // DELETE: Deleta uma tag

/**
 * @section Rotas de Associações Notícia-Tag
 * Propósito: Gerenciar a relação muitos-para-muitos entre notícias e tags.
 * Autorização: Criar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/news/:newsId/tags/:tagId", ensureAuth, ensureRole(['gestor']), validationBody(newsToTagSchema), newsToTagController.create); // POST: Associa notícia a tag
router.get("/news-to-tags", ensureAuth, newsToTagController.findAll); // GET: Lista todas as associações notícia-tag
router.get("/news/:newsId/tags", ensureAuth, newsToTagController.findByNewsId); // GET: Lista tags de uma notícia
router.get("/tags/:tagId/news", ensureAuth, newsToTagController.findByTagId); // GET: Lista notícias de uma tag
router.delete("/news/:newsId/tags/:tagId", ensureAuth, ensureRole(['gestor']), newsToTagController.remove); // DELETE: Remove associação notícia-tag

/**
 * @section Rotas de Comentários de Notícias
 * Propósito: Gerenciar a criação, listagem, busca, atualização, aprovação e exclusão de comentários em notícias.
 * Autorização: Criar, Editar, Deletar exigem autenticação. Aprovar exige 'gestor'.
 */
router.post("/news/:newsId/comments", ensureAuth, validationBody(newsCommentSchema), newsCommentController.create); // POST: Cria um novo comentário
router.get("/news/:newsId/comments", ensureAuth, newsCommentController.findByNewsId); // GET: Lista comentários de uma notícia
router.get("/comments", ensureAuth, newsCommentController.findAll); // GET: Lista todos os comentários
router.get("/comments/:id", ensureAuth, newsCommentController.findById); // GET: Busca um comentário por ID
router.put("/comments/:id", ensureAuth, newsCommentController.update); // PUT: Atualiza um comentário
router.put("/comments/:id/approve", ensureAuth, newsCommentController.approve); // PUT: Aprova um comentário (apenas gestores)
router.delete("/comments/:id", ensureAuth, newsCommentController.delete); // DELETE: Deleta um comentário

/**
 * @section Rotas de Mídias de Notícias
 * Propósito: Gerenciar o upload, listagem, busca, atualização e exclusão de mídias associadas a notícias.
 * Autorização: Criar, Editar, Deletar exigem papel 'gestor'. Listar/Buscar exigem autenticação.
 */
router.post("/news/:newsId/media", ensureAuth, ensureRole(['gestor']), validationBody(newsMediaSchema), newsMediaController.create); // POST: Cria uma nova mídia de notícia
router.get("/news/:newsId/media", ensureAuth, newsMediaController.findByNewsId); // GET: Lista mídias de uma notícia
router.get("/news-media", ensureAuth, newsMediaController.findAll); // GET: Lista todas as mídias
router.get("/news-media/:id", ensureAuth, newsMediaController.findById); // GET: Busca uma mídia por ID
router.put("/news-media/:id", ensureAuth, ensureRole(['gestor']), validationBody(newsMediaSchema), newsMediaController.update); // PUT: Atualiza uma mídia
router.delete("/news-media/:id", ensureAuth, ensureRole(['gestor']), newsMediaController.delete); // DELETE: Deleta uma mídia


export { router };

