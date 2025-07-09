'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('gestor', 'operador', 'externo'),
        allowNull: false,
        defaultValue: 'operador',
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      photo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('reflorestation_areas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true,
      },
      polygon: { // Coluna POLYGON adicionada
        type: Sequelize.GEOMETRY('POLYGON'),
        allowNull: true,
      },
      area_size: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('community_gardens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true,
      },
      location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true,
      },
      polygon: {
        type: Sequelize.GEOMETRY('POLYGON'),
        allowNull: true,
      },
      area_size: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      established_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      contact_person: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      photo_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('news_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('tags', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });

    await queryInterface.createTable('seedlings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      reforestation_area_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'reflorestation_areas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      species_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      scientific_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      planting_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      coordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true,
      },
      current_height: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true,
      },
      current_status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_watering_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      last_maintenance_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      coordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true,
      },
      reforestation_area_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'reflorestation_areas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      garden_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'community_gardens',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('garden_plots', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      garden_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'community_gardens',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      plot_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      size: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true,
      },
      assigned_to: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      current_crops: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('educational_materials', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      material_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      file_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('news', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cover_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('reset_codes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });


    await queryInterface.createTable('news_comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'news',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      parent_comment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'news_comments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    await queryInterface.createTable('news_media', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'news',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      file_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      file_type: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });


    await queryInterface.createTable('event_participants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'registered',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });

    await queryInterface.createTable('news_to_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'news',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'news_categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });

    await queryInterface.createTable('news_to_tags', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'news',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    }, {
      timestamps: false,
      createdAt: 'created_at',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('news_to_tags');
    await queryInterface.dropTable('news_to_categories');
    await queryInterface.dropTable('event_participants');
    await queryInterface.dropTable('news_media');
    await queryInterface.dropTable('news_comments');
    await queryInterface.dropTable('reset_codes');
    await queryInterface.dropTable('refresh_tokens');
    await queryInterface.dropTable('news');
    await queryInterface.dropTable('educational_materials');
    await queryInterface.dropTable('garden_plots');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('seedlings');
    await queryInterface.dropTable('tags');
    await queryInterface.dropTable('news_categories');
    await queryInterface.dropTable('community_gardens');
    await queryInterface.dropTable('reflorestation_areas');
    await queryInterface.dropTable('users');
  }
};
